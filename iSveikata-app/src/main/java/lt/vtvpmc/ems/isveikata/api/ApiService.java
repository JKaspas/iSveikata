package lt.vtvpmc.ems.isveikata.api;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.vtvpmc.ems.isveikata.mappers.ApiMapper;

@Service
@Transactional
public class ApiService {

    @Autowired
    private JpaApiRepository apiRepository;
    
    @Autowired
    private ApiMapper mapper;

    public void createApi(ApiDto api) {
        apiRepository.save(mapper.dtoToApi(api));
    }

    public List<ApiDto> getAllApi() {
        return mapper.apisToDto(apiRepository.findAll());
    }

}