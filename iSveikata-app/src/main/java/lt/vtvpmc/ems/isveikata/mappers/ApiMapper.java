package lt.vtvpmc.ems.isveikata.mappers;

import java.util.List;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import lt.vtvpmc.ems.isveikata.api.Api;
import lt.vtvpmc.ems.isveikata.api.ApiDto;

@org.mapstruct.Mapper(componentModel = "spring")
public interface ApiMapper {

	ApiMapper MAPPER = Mappers.getMapper(ApiMapper.class);

	@Mappings({ 
		@Mapping(source = "ingredientName", target = "title"),
		@Mapping(source = "description", target = "description"),
		@Mapping(target = "id", ignore = true) })
	Api toApi(ApiDto apiDto);

	@InheritInverseConfiguration
	ApiDto fromApi(Api api);

	List<ApiDto> fromApis(List<Api> apis);

}